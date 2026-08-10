import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(99) < 3000"],
  },
  stages: [
    { duration: "10s", target: 15 },
    { duration: "20s", target: 15 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  let res = http.get("http://localhost/Test_API/calc.php?value1=23&value2=67&target=plus");
  check(res, { 
    'status 200': (r) => r.status === 200,
    'status is PASSED': (r) => {
      try {
        return r.json().status === 'PASSED';
      } catch {
        return false;
      }
    },
  });
  sleep(1);
}