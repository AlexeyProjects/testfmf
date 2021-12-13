export default {
    data: () => {
        return {
            filterMixin: true
        }
    },
    
    methods: {
        numberViewing(val) {
            let myNumber = val
            let myFixedNumber = null
            let myMillion = ''
            if ( val >= 1000000 ) {
                myFixedNumber = (myNumber/1000000)
                myMillion = myFixedNumber + ' миллион';
                return myMillion
            }
            else {
                myFixedNumber = (myNumber/1000)
                myMillion = myFixedNumber + ' тысяч';
                return myMillion
            }
            
        },
    },

    filters: {
        numberViewing(val) {
            let myNumber = val
            let myFixedNumber = null
            let myMillion = ''
            let valString = String(val)
            valString = valString.replace(/\D/g,'');
            if ( valString.length >= 7 ) {
                myFixedNumber = (myNumber/1000000)
                myMillion = myFixedNumber + ' миллион';
                return myMillion
            }
            else {
                myFixedNumber = (myNumber/1000)
                myMillion = myFixedNumber + ' тысяч';
                return myMillion
            }
            
        }
    }
}