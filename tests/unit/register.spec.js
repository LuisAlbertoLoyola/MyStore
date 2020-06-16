import { mount } from "@vue/test-utils";
import { expect } from "chai";
import Register from "@/components/Register"

describe('Register.vue', ()=>{
      // Given/Arrange this exist
      const wrapper = mount(Register)
      let checkbox = wrapper.find('input[type="checkbox"]')
      let registerBtn = wrapper.find('button[type="submit"]')

      it('has a disabled button', ()=>{
      // When/Act this happens (event or something else)
      checkbox.setChecked(false)
      // Then/Assert this happens (event or something else)
      expect(registerBtn.classes('is-disabled')).to.be.true
    })
    it('has a button not disabled when checkbox is checked', ()=>{
        checkbox.setChecked(true)
        expect(registerBtn.classes('is-disabled')).to.be.false
    })
    it('registers a User', () =>{
        // 0) Cargar el componente con los metodos de prueba
        let isSent = false
        const stubMethod = () => { isSent = true}
        const wrapper = mount(Register,{
            methods: {
                submitForm: stubMethod
            }    
        })
        // 1) Encontrar los campos necesarios
        let userName = wrapper.find('input[type="text"')
        let email = wrapper.find('input[type="email"')
        let password = wrapper.find('input[type="password"')
        let registerBtn = wrapper.find('button[type="submit"]')
        // 2) Asignar los valores a los campos
        userName.setValue('Baltazar Bratt')
        email.setValue('bbratt@hollywood.com')
        password.setValue('DanceFight')
        // 3) Enviar formulario
        registerBtn.trigger('click')
        // 4) Probar que se envio el resgitro
        expect(isSent).to.be.true
  })
})