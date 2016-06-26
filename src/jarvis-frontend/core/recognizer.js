import Bus from './jarvis-frontend/core/bus.js';

const SpeechRecognition = window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition ||
    window.oSpeechRecognition;

class Recognizer {
    constructor($sce) {
        this.$sce = $sce;
        this.listening = false;
        this.transcript = '';
        this.recognition = new SpeechRecognition();
        this.recognition.onresult = this.result.bind(this);
        this.recognition.onend = this.onEnd.bind(this);
        this.langs = this.getLangs();
    }

    getLangs() {
        return [
            {label: this.$sce.trustAsHtml('Afrikaans'), value: 'af-ZA'},
            {label: this.$sce.trustAsHtml('Bahasa Indonesia'), value: 'id-ID'},
            {label: this.$sce.trustAsHtml('Bahasa Melayu'), value: 'ms-MY'},
            {label: this.$sce.trustAsHtml('Català'), value: 'ca-ES'},
            {label: this.$sce.trustAsHtml('Čeština'), value: 'cs-CZ'},
            {label: this.$sce.trustAsHtml('Deutsch'), value: 'de-DE'},
            {label: this.$sce.trustAsHtml('English'), value: 'en-US'},
            {label: this.$sce.trustAsHtml('Español'), value: 'es-AR'},
            {label: this.$sce.trustAsHtml('Euskara'), value: 'eu-ES'},
            {label: this.$sce.trustAsHtml('Français'), value: 'fr-FR'},
            {label: this.$sce.trustAsHtml('Galego'), value: 'gl-ES'},
            {label: this.$sce.trustAsHtml('Hrvatski'), value: 'hr_HR'},
            {label: this.$sce.trustAsHtml('IsiZulu'), value: 'zu-ZA'},
            {label: this.$sce.trustAsHtml('Íslenska'), value: 'is-IS'},
            {label: this.$sce.trustAsHtml('Italiano'), value: 'it-IT'},
            {label: this.$sce.trustAsHtml('Magyar'), value: 'hu-HU'},
            {label: this.$sce.trustAsHtml('Nederlands'), value: 'nl-NL'},
            {label: this.$sce.trustAsHtml('Norsk bokmål'), value: 'nb-NO'},
            {label: this.$sce.trustAsHtml('Polski'), value: 'pl-PL'},
            {label: this.$sce.trustAsHtml('Português'), value: 'pt-BR'},
            {label: this.$sce.trustAsHtml('Română'), value: 'ro-RO'},
            {label: this.$sce.trustAsHtml('Slovenčina'), value: 'sk-SK'},
            {label: this.$sce.trustAsHtml('Suomi'), value: 'fi-FI'},
            {label: this.$sce.trustAsHtml('Svenska'), value: 'sv-SE'},
            {label: this.$sce.trustAsHtml('Türkçe'), value: 'tr-TR'},
            {label: this.$sce.trustAsHtml('български'), value: 'bg-BG'},
            {label: this.$sce.trustAsHtml('Pусский'), value: 'ru-Ru'},
            {label: this.$sce.trustAsHtml('Српски'), value: 'sr-RS'},
            {label: this.$sce.trustAsHtml('한국어'), value: 'ko-KR'},
            {label: this.$sce.trustAsHtml('中文'), value: 'cmn-Hans-CN'},
            {label: this.$sce.trustAsHtml('日本語'), value: 'ja-JP'},
            {label: this.$sce.trustAsHtml('Lingua latīna'), value: 'la'}
        ];
    }

    selectLang(lang) {
        this.recognition.lang = lang;
    }

    result(event) {
        if (event.results.length > 0) {
            let transcripts = event.results[event.results.length - 1];
            if (transcripts.isFinal) {
                this.transcript = transcripts[0].transcript;
                this.stop();
                Bus.publish({
                    name: 'transcript',
                    value: this.transcript
                });
            }
        }
    }

    start() {
        this.listening = true;
        this.recognition.start();
    }

    onEnd() {
        this.listening = false;
    }

    stop() {
        this.recognition.stop();
    }
}

angular.module('Jarvis')
    .service('Recognizer', Recognizer);
