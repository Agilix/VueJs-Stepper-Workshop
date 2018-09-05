<template>
    <div>

        <lead-message
            title="Salut john"
            text="Thank you for booking a stand with us at Packaging Innovations. My Easyfairs is your online dashboard to help you get ready for this event. We just need 3 minutes of your time to review some key information and you will be on your way."
        ></lead-message>

        <router-link :to="{name: 'step_1'}" class="btn">Let’s get started</router-link>
    </div>
</template>
