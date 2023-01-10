import { ref, computed, watch } from 'vue';
import { defineStore } from "pinia";
import { defaultWords } from "../assets/defaults";

export const useWordsStore = defineStore('words', () => {

  const groups = ['A', 'B'];
  const i = 'free';
  const o = 'busy';

  let build = {};
  groups.forEach((group) => {
    build[group] = {};
    build[group][i] = {};
    build[group][o] = {};
  });

  // retrieve words from local storage
  const storedWords = localStorage.getItem('words');
  if (!storedWords) {
    // construct from default
    Object.keys(defaultWords).forEach((group) => {
      defaultWords[group].forEach((word) => {
        build[group][i][word] = true;
      });
    });

  } else {
    //construct from local storage
    build = JSON.parse(storedWords);
  }

  const words = ref(build);
  const currentGroupIndex = ref(localStorage.getItem('currentGroup') ?? 0);
  const currentGroupName = computed(() => groups[currentGroupIndex.value] );



  // update local storage if words changes
  watch(words, () => {
    localStorage.setItem('words', JSON.stringify(words.value));
  }, { deep: true });

  watch(currentGroupIndex, () => {
    localStorage.setItem('currentGroup', currentGroupIndex.value);
  });

  // retrieve random word and use it
  function random() {

    const group = currentGroupName.value;

    // get available words
    let wordsAvailable = Object.keys(words.value[group][i]);

    // if no words available, swap available and used
    if (wordsAvailable.length === 0) {
      [words.value[group][i], words.value[group][o]] = [words.value[group][o], words.value[group][i]];
      wordsAvailable = Object.keys(words.value[group][i])
    }

    // pick a random word from available, delete it from available, add it to used
    const randomWord = wordsAvailable[wordsAvailable.length * Math.random() << 0];
    delete words.value[group][i][randomWord];
    words.value[group][o][randomWord] = true;

    return randomWord;
  }

  function changeGroup() {
    currentGroupIndex.value = (currentGroupIndex.value + 1) % groups.length;
  }


  return { words, random, currentGroupIndex, currentGroupName, changeGroup };
});
