let myMixins = {
    created: function() {
        this.hello();
    },
    methods: {
        hello: function() {
            console.log('hello from mixin!');
        }
    }
};

export { myMixins };
