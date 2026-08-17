import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    thresholds: {
        http_req_duration: ["p(99) < 3000"],
    },
    stages: [
        { duration: "2s", target: 2 },
        { duration: "5s", target: 4 },
        { duration: "2s", target: 0 }
    ]
};

export default function () {
    let res = http.get("http://localhost/Test_API/auth.php?name=admin&pass=0000");
    check(res, {
        'Check - status 200': (r) => r.status === 200,
        'Check - token 84F35R2gh75CV25D542208WEnMo5425F0F1358': (r) => r.json().token === '84F35R2gh75CV25D542208WEnMo5425F0F1358'
    });
    sleep(1);
}