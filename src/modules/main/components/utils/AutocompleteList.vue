<template>
    <div class="relative w-full">
        <h2 class="font-semibold text-sm md:text-xl ">{{ title }}</h2>
        <div @click="showDropdown = true" class="relative">
            <input type="text" v-model="inputValue" @input="onInput" @focus="showDropdown = true" @blur="handleBlur"
                class="rounded-lg border text-sm md:text-xl w-3/4 py-1 px-3 m-auto" placeholder="Type to search..."/>
            <div v-if="showDropdown"
                class="absolute top-full left-7 mt-1 w-3/4 bg-white border rounded-lg shadow-lg z-50">
                <div v-for="item in filteredSuggestions" :key="item.id" @click="selectItem(item)"
                    class="p-2 hover:bg-gray-200 cursor-pointer text-sm md:text-xl">
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, computed } from 'vue';

const emit = defineEmits(["getInfo"])
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    suggestions: {
        type: Array,
        required: false,
        default: () => []
    }
});


const sendInfo = (info) => {
    emit('getInfo', info)
}


const inputValue = ref('');
const showDropdown = ref(false);

const filteredSuggestions = computed(() =>
    props.suggestions.filter(item =>
        item.name.toLowerCase().includes(inputValue.value.toLowerCase())
    )
);


const onInput = () => {
    if (inputValue.value === '') {
        emit('getInfo', null)
        showDropdown.value = false;
    } else {
        showDropdown.value = true;
    }
};

const selectItem = (item) => {
    inputValue.value = "";
    inputValue.value = item.name;
    sendInfo(item)

    showDropdown.value = false;
};

const handleBlur = () => {
    setTimeout(() => {
        showDropdown.value = false;
    }, 100);
};
</script>