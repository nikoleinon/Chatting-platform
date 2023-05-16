const user={id:0,username:'',password:'',enabled:true};

export class Default{

    static get user(){
        return Object.assign({},user);
    }
}