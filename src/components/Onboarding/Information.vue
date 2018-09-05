<template>
    <div>
        <lead-message
            title="Basic informations"
            text="Please review the information you provided so we can get in touch with you, publish it on the event website and add it to the event catalogue."
        ></lead-message>

        <router-link :to="{name: 'step_0'}" class="btn">back</router-link>
        <router-link :to="{name: 'step_2'}" class="btn">next</router-link>

    </div>
</template>
