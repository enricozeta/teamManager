import {mapState, mapActions} from 'vuex'

export default {
  name: 'navbar',

  data() {
    return {
      logged : false
    }
  },
  computed:{
    ...mapState('account', ['status']),
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit() {
      this.logout()
    }
  }
}
