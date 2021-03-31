<template>
    <div class="container">
        <div class="container-title">
            <h2>{{ tableData.title }}</h2>
        </div >
            <div class="container-table">
                <table>
                    <thead>
                        <tr>
                            <th v-for="head in tableData.heads" :key="head">{{ head }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="col in tableData.datas" :key="col._id">
                            <td>{{ col._id }}</td>
                            <td>{{ col.dataCriacao }}</td>
                            <td>{{ col.dataAtualizacao }}</td>
                            <td>{{ col.nome }}</td>
                            <td>{{ col.abreviacao || col.estadoId }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </div>

</template>

<script>
export default {
    props: {
        tableData: {
            required: true,
            type: Object
        },
    },
}
</script>

<style scoped>

    .container {
        display: flex;
        width: 100%;
        height: auto;
        flex-direction: column;
    }

    .container .container-title {
        margin: 20px;
        text-align: center;
    }

    .container-title h2 {
        font-size: 40px;
    }

    .container .container-table {
        width: 90%;
        align-self: center;
        text-align: -webkit-center;
        border-radius: 30px;
        border-width: 2px;
        border-style: ridge;
        background: white;
        margin-bottom: 20px;
        overflow-x: auto;
    }

    .container .container-table table{
        text-align: center;
        margin: 30px;
        width: auto;
        border-collapse: collapse;
        border-spacing: 0;
    }

    th {
        height: 50px;
        width: 150px;
        padding: 0px;
    }

    tr {
        height: 25px;
    }

    tr:hover {
        background-color: #f5f5f5;
    }

    td {
        text-align: center;
        height: auto;
        width: 100px;
        padding: 5px;
    }

    th, td {
        border-bottom: 2px solid #ddd;
    }

    @media(max-width: 800px) {
        th, td {
            width: 140px;
            height: auto;
        }
    }
</style>
