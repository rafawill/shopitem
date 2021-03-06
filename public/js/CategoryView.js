window.CategoryView = Backbone.View.extend({
  template: "#categoryView",
  events: {
    'click .delete': 'removeCategory',
    'click .category_add': 'addCategory',
    'click .modal-footer .btn': 'hide',
    'click .modal-header .close': 'hide'
  },
  initialize: function() {
    _.bindAll(this,'render','removeCategory','addCategory');
    this.collection.fetch();
    this.collection.bind('all',this.render);

  },
  
  show: function() {
    $($(this.el).parents('.modal')).modal();
  },

  hide: function() {
    $($(this.el).parents('.modal')).modal('hide');
  },



  addCategory: function(e) { 
    e.preventDefault();
    this.collection.create({name: $(this.el).find('.category_name').val() });
  },

  removeCategory: function(e) {
    e.preventDefault();
    var id = $(e.target).parents('li').data('id');
    var model = this.collection.where({_id:id})[0];
    this.collection.remove(model);
    model.destroy();
  },

  render: function() {
    $(this.el).html($(this.template).html());

    this.collection.each(function(cat){
      var template = '<li data-id="'+cat.get('_id')+'">'+
                        cat.get('name') + ' <a href="#" class="pull-right delete">x</a>'+
                     '</li>';
      $(this.el).find('.categories').append(template);

    },this);



    return this;
  }
});
