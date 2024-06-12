process.on("exit", (code) => {
    console.log("Just before closing the process");
    console.log(code);
});
process.on("uncaughtException", (exc) => {
    console.log("Exception not catched")
    console.log(exc)
});
process.on("message", (message) => {
    console.log("Whenever a message is sent to here");
    console.log(message)
});