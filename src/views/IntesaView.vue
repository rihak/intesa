<script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { useWordsStore } from '../stores/words';


  const stateStart = 0
  const stateIdle = 1
  const stateGame = 2
  const stateOutcome = 3
  const stateOutcomeLast = 4
  const stateFinish = 5

  const wordsStore = useWordsStore();

  const word = ref('');
  const score = ref(0);
  const timer = ref(60);
  const skips = ref(3);

  let state = stateStart;
  let timeInitial = null;
  let timeReference = null;


  function onMain() {
    if ( state == stateStart ) {
      state = stateIdle;
      return;
    }
    if ( state == stateIdle ) {
      word.value = wordsStore.random();
      state = stateGame;
      return;
    }
    if ( state == stateGame ) {
      state = stateOutcome;
      return;
    }
    if ( state == stateFinish ) {
      state = stateStart;
      score.value = 0;
      skips.value = 3;
      word.value = '';
      timer.value = 60;
      return;
    }
  }

  function onReset() {

  }

  function onYes() {
    if ( state == stateOutcome ) {
      state = stateIdle;
      score.value += parseInt(wordsStore.currentGroupIndex + 1);
      return;
    }
    if ( state == stateOutcomeLast ) {
      score.value += parseInt(wordsStore.currentGroupIndex + 1);
      state = stateFinish;
      return;
    }
  }

  function onNo() {
    if ( state == stateOutcome ) {
      state = stateIdle;
      score.value = score.value - wordsStore.currentGroupIndex - 1 > 0 ? score.value - wordsStore.currentGroupIndex - 1 : 0;
      return;
    }
    if ( state == stateOutcomeLast ) {
      score.value = score.value - wordsStore.currentGroupIndex - 1 > 0 ? score.value - wordsStore.currentGroupIndex - 1 : 0;
      state = stateFinish;
      return;
    }
  }

  function onSkip() {
    if ( state == stateOutcome ) {
      state = 1
      if ( skips.value > 0) {
        skips.value -= 1
      } else {
        if ( score.value > 0) {
          score.value -= 1
        }
      }
      return
    }
    if ( state == stateOutcomeLast ) {
      state = stateFinish;
    }
  }

  function onChangeGroup() {
    wordsStore.changeGroup();
  }

  function mainHidden() {
      return [false, false, false, true, true, false][state];
  }
  function outcomeHidden() {
      return [true, true, true, false, false, true][state];
  }
  function boxHidden() {
      return [true, false, false, false, false, true][state];
  }
  function scoreHidden() {
      return [true, false, false, false, false, false][state];
  }

  onMounted(() => {
    nextTick(() => {
      window.setInterval(() => {
        if ( state == stateIdle) {
          timeInitial = timer.value;
          timeReference = Math.trunc((new Date()).getTime() / 1000)
        }
        if ( state == stateGame ) {
          timer.value = timeInitial - (Math.trunc((new Date()).getTime() / 1000) - timeReference)
        }
        if ( timer.value < 0 && state != stateFinish ) {
          timer.value = 0
          state = stateOutcomeLast
        }
      }, 1);
    })
  })

</script>

<template>
  <div class="h-80 grid grid-flow-row-dense grid-cols-8 grid-rows-4 gap-4 [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:rounded-lg [&>div]:text-white [&>div]:text-2xl [&>div]:font-bold">
    <div class="col-span-1 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 cursor-pointer" @click="onReset()">&#9851;</div>
    <div class="col-span-6 row-span-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 cursor-pointer" @click="onMain()"></div>
    <div class="col-span-1 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 cursor-pointer" @click="onYes()">&#10004;</div>
    <div class="col-span-1 cursor-pointer" :class="wordsStore.currentGroupName == 'A' ? 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600' : 'bg-green-500 hover:bg-green-400 active:bg-green-600'" @click="onChangeGroup()">2x</div>
    <div class="col-span-1 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 cursor-pointer" @click="onNo()">&#10006;</div>
    <div class="col-span-1 bg-pink-800">&#10160;{{ skips }}</div>
    <div class="col-span-1 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 cursor-pointer" @click="onSkip()">&#10160;</div>
    <div class="col-span-1 bg-blue-700">:{{ timer }}</div>
    <div class="col-span-6 bg-green-500">{{ word }}</div>
    <div class="col-span-1 bg-pink-800">{{ score }}</div>
  </div>
</template>
