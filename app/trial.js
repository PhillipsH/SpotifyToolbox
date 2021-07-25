
const yo = () => () => {
    console.log("running")
    return "hey"
  
};
function hey(){
    yo()

}
hey()