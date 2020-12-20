let tryc = 0;
let hbi;
let hb;
let ack = false;
let ackt;
let ws;
let _token;

export default function connect(token = _token) {
    if (!token) return;
    else _token = token;
    tryc++;
    if (tryc >= 5) {
        this.$store.commit('updateServices', { ws: 'ERROR' });
        return console.log('[EROS] Websocket unavailable !');
    };

    ws = new window.WebSocket('ws://localhost:3030');

    ws.onopen = () => {
        console.log('[EROS] Websocket connected !');
        tryc = 0;
    };

    ws.onclose = function (evt) {
        if (evt.code == 4800) return;
        clearInterval(hb);
        clearTimeout(ackt);
        ws?.close();
        console.log('[EROS] Websocket closed !');
        this.$store.commit('updateServices', { ws: 'WAITING' });
        setTimeout(() => {
            const c = connect.bind(this);
            c(token);
        }, 5000);
    }.bind(this);

    ws.onmessage = function (evt) {
        const json = JSON.parse(evt.data);

        console.log('[EROS] Websocket message', json);

        switch (json.op) {
            case 0:
                hbi = json.d.heartbeat;

                hb = setInterval(() => {
                    ws.send(JSON.stringify({ op: 1 }));

                    ackt = setTimeout(() => {
                        if (ack) ack = false;
                        else {
                            ws.close();
                        };
                    }, 5000);
                }, hbi);

                ws.send(JSON.stringify({
                    op: 3,
                    d: {
                        token,
                    },
                }));
                break;

            case 5:
                this.$store.commit('updateServices', { ws: 'READY' });
                break;

            case 2:
                ack = true;
                break;
            case 4:
                if (json.t == 'USER_UPDATE') {
                    this.$store.commit('updateUser', json.d);
                    var user = window.localStorage.getItem('user');
                    user = Object.assign(user, json.d);
                    window.localStorage.setItem('user', user);
                } else if (json.t == 'USER_AVATAR_UPDATE') {
                    this.$store.commit('updateUser', { avatar: json.d });
                    var user = window.localStorage.getItem('user');
                    user = Object.assign(user, { avatar: json.d });
                    window.localStorage.setItem('user', user);
                };
                break;
            default:
                break;
        };
    }.bind(this);
};

export const close = function() {
    clearInterval(hb);
    clearTimeout(ackt);
    ws?.close(4800);
    ws = null;
    console.log('[EROS] Websocket closed !');
    this.$store.commit('updateServices', { ws: 'WAITING' });
};