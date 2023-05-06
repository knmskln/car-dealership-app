<template>

  <v-main>
    <v-container class="pl-12 pt-16 pb-16" fluid style="background: url('../../public/img/main.jpg') no-repeat bottom; background-size: cover;">
      <v-row no-gutters justify="center" align="center" style="max-width: 800px;">
        <v-col class="text-h2 pb-8" cols="12">
          GEELY
        </v-col>
        <v-col class="text-h5 pb-8" cols="12">
          У аўтасалонах Geely «Лакшэры Мотарс плюс» мы падбяром для Вас індывідуальныя фінансавыя прапановы, прапануем выгадныя ўмовы сэрвіснага абслугоўвання, а таксама паслугі страхавання аўтамабіляў
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" to="/cars">выбраць аўтамабіль</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row class="pl-12 pr-12">
        <v-col cols="12" class="text-h5 pl-0">Нашы аўтасалоны на мапе:</v-col>
        <v-col cols="6" class="pl-0">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2349.1934492227465!2d27.50395897605259!3d53.92830697246384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbc56d1d9e59e7%3A0x444de3d34ed97544!2z0YPQuy4g0J7RgNC70L7QstGB0LrQsNGPIDg4LCDQnNC40L3RgdC6!5e0!3m2!1sru!2sby!4v1683228612362!5m2!1sru!2sby" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </v-col>
        <v-col cols="6" class="pr-0">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2351.5537338658933!2d27.56200437604922!3d53.8863612724508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfd6ceefe97f%3A0x33726a044fbcd064!2z0YPQu9C40YbQsCDQnNCw0Y_QutC-0LLRgdC60L7Qs9C-IDIsINCc0LjQvdGB0Lo!5e0!3m2!1sru!2sby!4v1683228767715!5m2!1sru!2sby" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </v-col>
        <v-col cols="12" style="text-align: center">2023 © ТАА "Лакшэры Мотарс плюс"</v-col>
        <v-col cols="12" style="text-align: center">Афіцыйны дылер Geely у Беларусі. Ўсе правы абаронены.</v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  setup() {


    return {
    }
  }
})
</script>
<style>
.container
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}

</style>
