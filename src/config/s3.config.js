import aws from "aws-sdk";
import config from "./index.js";

const s3 = new aws.S3({
    accessKeyId:config.S3_Access_key,
    secretAccessKey:config.S3_Secret_Access_key,
    region : config.S3_REGION
})

export default s3;