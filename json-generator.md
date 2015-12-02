[
  '{{repeat(50, 70)}}',
  {
    id: '{{floating(1000, 4000, 2, "00.0000")}}/eLife.{{floating(1000, 4000, 2, "00000")}}',
    desc: '{{lorem(15, "words")}}',
    version: '{{integer(20, 40)}}',
    run: '{{integer(20, 40)}}',
    title: '{{floating(1000, 4000, 2, "00.0000")}}/eLife.{{floating(1000, 4000, 2, "00000")}}',
    type: function (tags) {
      var fruits = ['poa', 'vor'];
      return fruits[tags.integer(0, fruits.length - 1)];
    },
    datePublished: '{{date(new Date(2014, 0, 1), new Date(), "dd/MM/YYYY")}}',
    authors: '{{firstName()}} {{surname()}}, {{firstName()}} {{surname()}}, {{firstName()}} {{surname()}}, {{firstName()}} {{surname()}}',
    status: function (tags) {
      var fruits = ['Errors', 'In Progress', 'User Input Required', 'Scheduled'];
      return fruits[tags.integer(0, fruits.length - 1)];
    }
  }
]