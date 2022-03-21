import dotenv from 'dotenv'

dotenv.config({path:'./.env'});

export default {
    port:process.env.PORT,
    url:process.env.URL,
    secret:process.env.SECRET
}