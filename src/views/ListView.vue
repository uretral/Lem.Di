<template>
  <Section row-class="list-row">

    <div class="list">

      <div class="list-header">
        <h1>Твой список очень важных дел</h1>

        <fieldset>

          <label>
            <input type="text" autocomplete="off" v-model="task"/>
          </label>

          <button @click="add"></button>

        </fieldset>


      </div>

      <div class="list-body">

        <fieldset v-for="item in list" :key="item.id">

          <ListItem v-model="item.label"
                    :itemId="item.id"
                    :status="item.status"
                    :confirmEvent="confirmEvent"
                    @saving="update"/>

          <MSelect :options="statuses"
                   :item="item"
                   @selected="selected">{{ selectTitle(item) }}</MSelect>

        </fieldset>

      </div>

      <div class="list-footer"></div>
    </div>


  </Section>
</template>

<script>
import Section from "@/components/frames/Section";
import store from "@/store";
import MSelect from "@/components/form/MSelect";
import ListItem from "@/components/ListItem";
import {EventBus} from "@/bus";

export default {
  name: "ListView",
  data() {
    return {
      task: null,
      confirmEvent: 'onAgreeDelete'
    }
  },
  components: {ListItem, MSelect, Section},
  computed: {
    list: () => store.getters["todo/list"],
    statuses: () => store.getters["todo/statuses"],
    userId: () => store.getters["auth/userId"],
  },
  methods: {

    add() {
      store.dispatch('todo/add', {
        user: {userId: this.userId},
        todo: {
          userId: this.userId,
          label: this.task,
          status: "new",
          created_at: new Date().toISOString()
        }
      })

      this.task = null
    },

    selectTitle(item) {
      let needle = this.statuses.find(i => i.status === item.status)
      return needle ? needle.label : ''
    },

    selected(item) {
      store.dispatch('todo/update', {
        id: item.id,
        todo: {status: item.status},
        user: {userId: this.userId}
      })
    },

    update(id, label) {
      store.dispatch('todo/update', {
        id: id,
        todo: {label},
        user: {userId: this.userId}
      })

    },

    deleting(id) {
      store.dispatch("todo/delete", {
        id,
        user: {userId: this.userId}
      })
    }
  },

  mounted() {

    store.dispatch('todo/list', {userId: this.userId})

    EventBus.$on(this.confirmEvent, (payload) => {
      this.deleting(payload)
    })

  }
}
</script>
