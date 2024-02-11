<template>
    <div class="mt-5">
        <div v-if="profile" class="product_wrapper">
            <div class="product_item">
                <img class="man_img" src="user-avatar.png" alt="">
                <h2>{{ profile.username }}</h2>
                <h5>
                    <span class="badge bg-info">{{ profile.role }}</span>
                </h5>
                <h6 class="mt-2">{{ profile.email }}</h6>
                <div class="social_icon">
                    <a href="#"><i class="fa fa-google"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-facebook-f"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import AuthService from "@/services/AuthService";
export default {
    name: "Profile",
    data() {
        return {
            profile: null,
        };
    },
    mounted() {
        this.profile = JSON.parse(AuthService.getProfile())
    },
};
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,700&display=swap');

* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
}

button:focus,
input:focus,
textarea:focus {
    outline: 0;
}

.product_wrapper {
    width: 100%;
    /* height: 100vh; */
    display: flex;
    align-items: center;
    justify-content: center;
}

.product_item {
    width: 400px;
    margin: 0 auto;
    background: #022d62;
    border-radius: 15px;
    padding: 40px 25px;
    text-align: center;
    color: #ffffff;
    transition: .3s;
}

.product_item:hover {
    transform: translateY(-10px);
}

.man_img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background: #ffffff;
}

.product_item h5 {
    font-size: 17px;
    font-weight: 500;
    margin: 10px 0 0 0;
}

.product_item h2 {
    font-size: 22px;
    font-weight: 700;
    margin-top: 10px;
}

.product_item p {
    font-size: 14px;
    margin-top: 10px;
}

.social_icon a {
    width: 30px;
    height: 30px;
    background: #ffffff;
    border-radius: 50%;
    margin: 20px 4px 0 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #022d62;
    text-decoration: none;
}
</style>