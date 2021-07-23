<template>
    <v-sheet rounded="xl" color="white" elevation="6" min-height="90vh">
		<v-data-table 
			:headers="headers" 
			:items="items" 
			:search="search" 
			sort-by="number"
			class="elevation-1"
			hide-default-footer
		>
			<template v-slot:top>
				<v-toolbar flat dark>
					<v-toolbar-title>문서목록</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Search"
						single-line
						hide-details
					></v-text-field>
					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="text-h5">목록에서 지우시겠습니까?</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="closeDelete">아니오</v-btn>
								<v-btn color="blue darken-1" text @click="deleteItemConfirm">예</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>
			<template v-slot:item="{ item }">
				<tr>
					<td align="start">{{item.number}}</td>
					<td class="nameTable">{{item.name}}</td>
					<td>{{item.date}}</td>
					<td>
						<v-icon
							small
							@click="deleteItem(item)"
						>
							mdi-delete
						</v-icon>
					</td>
				</tr>
			</template>
		</v-data-table>

		<v-file-input class="add" ref="file" type="file" name="file" id="file" accept="text/*" multiple style="display: none"/>
		<v-btn class = "white--text" color = "blue-grey darken-2" @click="clickFile">문서추가</v-btn>
    </v-sheet>
</template>

<script>
export default {
	name: "DocumentList",
	data() {
		return {
			search: '',
			dialogDelete: false,
			headers: [
				{
					text: '추가순서',
					align: 'start',
					width: 100,
					value: 'number'
				},
				{
					text: '이름',
					align: 'center',
					width: 'fill-width',
					value: 'name'
				},
				{
					text: '수정일',
					align: 'center',
					width: 110,
					value: 'date'
				},
				{ 
					text: '', 
					value: 'actions', 
					align: 'start',
					width: 50,
					sortable: false 
				}
			],
			items: [],
			editedIndex: -1,
			editedItem: {
				number: 0,
				name: '',
				date: ''
			},
			defaultItem: {
				number: 0,
				name: '',
				date: ''
			},
		}
	},

	watch: {
		dialogDelete (val) {
			val || this.closeDelete()
		}
	},
	
	created () {
		this.initialize()
	},
	
	methods: {
		initialize () {
			this.items = [
				{
					number: 2,
					name: '문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서1문서문서문서문서문서문서문서문서문서문서문서문서',
					date: '2021-07-12'
				},
				{
					number: 1,
					name: '문서2',
					date: '2021-07-06'
				},
				{
					number: 3,
					name: '문서3',
					date: '2021-06-30'
				},
				{
					number: 4,
					name: '문서4',
					date: '2021-06-21'
				},
				{
					number: 5,
					name: '문서5',
					date: '2021-07-01'
				}
			]
		},
		deleteItem (item) {
			this.editedIndex = this.items.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialogDelete = true
		},
		deleteItemConfirm () {
			this.items.splice(this.editedIndex, 1)
			this.closeDelete()
		},
		closeDelete () {
			this.dialogDelete = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},
		clickFile() {
			this.$refs['file'].click();
		}
	}
}
</script>

<style scoped>
.nameTable{
	max-width: 1px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.td{
	align: center;
}

.v-sheet{
	position: relative;
}

.v-btn{
	position: absolute;
	bottom: 20px;
	margin-left: -47px;
}
</style>