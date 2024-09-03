import supertest from "supertest";
import environment from "./env.util.js";

const requester = supertest(`http://localhost:${environment.PORT}/api`)

export default requester;