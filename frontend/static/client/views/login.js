import AbstractView from "./AbstractView.js";
import Validator from "../../admin/data/validate.js";
import errPage from "../components/errPage.js";
import { getUser} from "../../admin/data/user.js";
import { router } from "../index.js";
import $ from "jquery";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Viewing login");
  }

  async getHtml() {
    var user = sessionStorage.getItem("idUserLogin");
    if(user){   
        return errPage()
    }
    return `
    <!-- component -->
    <div class="bg-white dark:bg-gray-900 container w-4/5 m-auto ">
                <div class="flex justify-center py-10">
                    <div class="hidden bg-cover rounded-xl shadow-xl overflow-hidden lg:block lg:w-2/3" style="background-image: url(https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-3d-cute-teddy-bear-gift-box-background-poster-image_207411.jpg)">
                    <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 class="text-4xl font-bold text-white">GẤU BÔNG CU TE HẠT ME</h2>
                            
                            <p class="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div class="flex-1">
                        <div class="text-center">
                            <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">WELCOME</h2>
                            
                            <p class="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                        </div>
    
                        <div class="mt-8">
                            <p class=" text-red-500 checkLogin"></p>
                                <div>
                                    <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                    <input type="email" name="email" id="email" placeholder="example@example.com" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
    
                                <div class="mt-6">
                                    <div class="flex justify-between mb-2">
                                        <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                        <a href="#" class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                    </div>
    
                                    <input type="password" name="password" id="password" placeholder="Your Password" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
    
                                <div class="mt-6">
                                    <button
                                        class="btn-signIn w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Sign in
                                    </button>
                                </div>
    
    
                            <p class="mt-6 text-sm text-center text-gray-400">Bạn có thể nhắn tin cho admin để tạo tài khoản hoặc lấy lại mật khẩu</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        `;
  }
}

$(document).on('click','.btn-signIn',async function(){
    var email = $('input[name="email"]')
    var pass =  $('input[name="password"]')
    if(Validator.valEmail(email) && Validator.valPassword(pass)){
        var users = await getUser()
        var itemUser = users.find(item=>{
            return (item.email == email.val() && item.password == pass.val() )
        })
        if(itemUser){
            sessionStorage.setItem("idUserLogin", itemUser.id);
            sessionStorage.setItem("emailMess", itemUser.email);
            $('.itemLogin').html('<i class="pr-1 fa fa-user-circle-o" aria-hidden="true"></i>'+itemUser.name)
            $('.itemLogin').attr('href','/detail-user')
            history.pushState(null, null, '/detail-user');
            router();
        }else{
            $('.checkLogin').html('Email hoặc mật khẩu không chính sát')
        }
    }
})