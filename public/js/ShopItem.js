window.ShopItem = Backbone.Model.extend({
 idAttribute:"_id",
 url:function(){
 	return _.isUndefined(this.get('_id')) ? '/shopitems'  : '/shopitem/' + this.get('_id')
 },
 defaults:function(){
 	return{
 		purchased:false,
 		category:null
 	};
 },
 parse:function(response){
 	response.category = new Category(response.category);
 	return response;
 }

});