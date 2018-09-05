<template>
    <div id="app">
        <wex-header :display-stepper="displayStepper()"></wex-header>


        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <router-view></router-view>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import WexHeader from '@/components/Header'
    export default {
        name: 'app',
        data: function () {
            return {
                currentStepIndex: 0
            }
        },
        methods: {
            displayStepper: function () {
                return this.$router.history.current.name !== 'step_0'
            }
        },
        components: {
            WexHeader
        }
    }
</script>

<style>
    body{
        margin:0;
        padding:0;
        background-color: #F9FAFB;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
    .btn{
        display: inline-block;
        padding: 13px 24px;
        border-radius:100px;
        background-color: #99CC32;
        color:#fff;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: bold;
        font-size:13px;
    }
</style>
