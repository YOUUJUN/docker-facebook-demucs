<template>

    <div class="yj-view yj-view-container main">
        <div class="yj-view-area">

        <h2>测试...</h2><h2>版本名:<span>{{name}}</span></h2>

        <textarea class="content">{{content}}</textarea>
        <button class="btn" v-on:click="send()">提交</button>
        <button class="btn" v-on:click="push()">比较冲突</button>

        </div>
    </div>

</template>

<script>

    export default {
        name: "Main",
        methods : {
            send : function () {
                this.$axios({
                    url : "/getFile",
                    method : "POST",
                    transformResponse: [function (data) {
                        return JSON.parse(data);
                    }],
                }).then(value => {
                    console.log("value",value);
                }).catch(err => {
                    console.log(err);
                })
            },
            push : function () {
                console.log("hello");
            }
        }
    };

</script>

<style scoped>
    @import "../assets/css/component.css";

    .main{
        width: 1170px;
        margin: 0 auto;
        text-align: left;
    }

    .content{
        width: 400px;
        height:650px;
    }

    .btn{
        display: block;
        height: 40px;
        line-height: 38px;
        font-size: 20px;
        margin-top: 20px;
    }

</style>














