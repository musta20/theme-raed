"use strict";(self.webpackChunkTheme_One=self.webpackChunkTheme_One||[]).push([[839],{8825:(e,l,a)=>{a.d(l,{H:()=>t});class s extends salla.AppHelpers{setHost(e){this.host=e}getElement(e){return this.host.querySelector(e)}getAttribute(e,l){var a;return null===(a=this.getElement(e))||void 0===a?void 0:a.getAttribute(l)}val(e){return this.getAttribute(e,"value")}isUser(){return!!salla.config.is_user}}const t=new s},9839:(e,l,a)=>{a.r(l),a.d(l,{salla_localization:()=>i});var s=a(4634),t=a(8825);const i=class{constructor(e){var l,a;(0,s.r)(this,e),this.language=salla.config.language,this.currency=salla.config.currency,this.languagesTitle=salla.lang.get("common.titles.language"),this.currenciesTitle=salla.lang.get("common.titles.currency"),this.ok=salla.lang.get("common.elements.ok"),t.H.setHost(this.host),salla.event.on("localization::show",(()=>this.show())),this.languageSlot=(null===(l=t.H.getElement('[slot="language"]'))||void 0===l?void 0:l.innerHTML)||'<label class="s-localization-label" for="lang-{code}"><span>{name}</span><div class="s-localization-flag flag iti__flag iti__{country_code}"></div></label>',this.currencySlot=(null===(a=t.H.getElement('[slot="currency"]'))||void 0===a?void 0:a.innerHTML)||'<label class="s-localization-label" for="currency-{code}"><span>{name}</span><small class="s-localization-currency">{code}</small></label>'}async show(){return this.modal.show()}async hide(){return this.modal.hide()}async submit(){let e;this.btn.load().then((()=>{if(this.currency&&this.currency.code!==salla.config.currency.code)return e=window.location.href,salla.currency.api.change(this.currency.code)})).then((()=>{this.language&&this.language.code!==salla.config.language.code&&(e=this.language.url)})).then((()=>this.btn.stop())).then((()=>this.hide())).then((()=>e&&(window.location.href=e)))}render(){return(0,s.h)("salla-modal",{id:"salla-localization",class:"hidden",ref:e=>this.modal=e},(0,s.h)("slot",{name:"header"},(0,s.h)("div",{slot:"header"})),(0,s.h)("div",{class:"s-localization-inner"},salla.config.languages?(0,s.h)("div",{class:"s-localization-section"},(0,s.h)("label",{class:"s-localization-title"},this.languagesTitle),(0,s.h)("fieldset",{class:"s-localization-fieldset"},(0,s.h)("div",{class:"s-localization-section-inner"},salla.config.languages.map((e=>(0,s.h)("div",{class:"s-localization-item"},(0,s.h)("input",{class:"s-localization-input",type:"radio",checked:this.language.code==e.code,onChange:()=>this.language=e,name:"language",id:"lang-"+e.code.toLowerCase(),value:e.code}),(0,s.h)("div",{id:"language-slot",innerHTML:this.languageSlot.replace(/\{name\}/g,e.name).replace(/\{code\}/g,e.code).replace(/\{country_code\}/g,e.country_code)}))))))):"",salla.config.currencies?(0,s.h)("div",{class:"s-localization-section"},(0,s.h)("label",{class:"s-localization-title"},this.currenciesTitle),(0,s.h)("fieldset",{class:"s-localization-fieldset"},(0,s.h)("div",{class:"s-localization-section-inner"},salla.config.currencies.map((e=>(0,s.h)("div",{class:"s-localization-item"},(0,s.h)("input",{class:"s-localization-input",type:"radio",name:"currency",checked:this.currency.code==e.code,onChange:()=>this.currency=e,id:"currency-"+e.code,value:e.code}),(0,s.h)("div",{id:"currency-slot",innerHTML:this.currencySlot.replace(/\{name\}/g,e.name).replace(/\{code\}/g,e.code).replace(/\{country_code\}/g,e.country_code)}))))))):""),(0,s.h)("p",{slot:"footer"},(0,s.h)("slot",{name:"footer"},(0,s.h)("salla-button",{wide:!0,ref:e=>this.btn=e,onClick:()=>this.submit()},this.ok))))}componentDidRender(){this.host.querySelectorAll("#currency-slot").forEach((e=>e.replaceWith(e.firstChild))),this.host.querySelectorAll("#language-slot").forEach((e=>e.replaceWith(e.firstChild)))}get host(){return(0,s.g)(this)}}}}]);