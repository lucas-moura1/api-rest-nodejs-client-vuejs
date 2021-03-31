<template>
    <div id="app">
        <Board v-for="data in this.tableData" :key="data.title" :tableData="data"/>
    </div>
</template>

<script>
import { getAllDatas } from './services'
import Board from './components/Board.vue'

export default {
    components: {
        Board
    },

    data() {
        return {
            tableData: []
        }
    },

  methods: {
    async getAll(endPoint) {
        const response =  await getAllDatas(endPoint).then(data => data)

        return response
    },

    getHeads(type, heads) {
        if (type === 'state')
            heads.push('Abreviação')

        if (type === 'city')
            heads.push('EstadoId')

        return heads
    },

    treatCityArray(cityDatas) {
        cityDatas.map(data => {

            data.estadoId = data.estadoId._id
        })

        return cityDatas
    }


  },

  created() {
      const init = async () => {
            const stateData = await this.getAll('estados')
            const cityData = await this.getAll('cidades')

            const newcityData = this.treatCityArray(cityData)

            const state = {
                title: 'Estados',
                heads: ['Id', 'Data de Criação', 'Data de Atualização', 'Nome'],
                datas: stateData
            }

            const city = {
                title: 'Cidades',
                heads: ['Id', 'Data de Criação', 'Data de Atualização', 'Nome'],
                datas: newcityData
            }

            state.heads = this.getHeads('state', state.heads)
            city.heads = this.getHeads('city', city.heads)

            this.tableData = [state, city]

        }

      init()
  }

}
</script>

<style>

* {
    margin: 0;
    padding: 0;
}

html, body {
    width: 100%;
    box-sizing: border-box;
    font-family: system-ui;
    background: #cccccc59;
}

</style>
