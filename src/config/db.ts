interface DB{
    url:string;
    name:string;
}
export let db:DB = {
    "url": "mongodb://127.0.0.1:27017/",
    "name": "news"
};