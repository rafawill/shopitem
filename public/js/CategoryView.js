window.CategoryView = Backbone.View.extend({
 template :"#categoryView",
 events:{
 	'click .delete': 'removeCategory',
 	'click .category_add': 'addCategory'
 },
 initialize:function(){
 	_.bindAll(this.render);
 	this.collection.fetch();
 	this.collection.bind('all', this.render)
 },
removeCategory:function(event){
 	event.preventDefault();
 	var id = $(event.target).parents('li').data('id');
 	var model = this.collection.where({_id:id})[0]
 	this.collection.remove(model);
 	model.destroy();
},
addCategory:function(event){
  event.preventDefault();
  this.collection.create({name:$(this.el.find('.category_name').val())});
},
render:function(){
 	$(this.el).html($(this.template).html());
 	this.collection.each(function(cat){
 		var template = '<li data-id="'+cat.get('_id')+'">'+cat.get('name')+'<a href="#" class="pull-right delete">x</a></li>';
      $(this.el).find('#categories').append(template);
 	},this);
 	return this
 }

});