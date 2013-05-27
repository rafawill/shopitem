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

window.ShoppingList = Backbone.Collection.extend({
  model: ShopItem,
  url: '/shopitems',

  purchased: function(){
    return new ShoppingList(this.where({purchased:true}));
  },

  productCategories: function() {
    var categories = [];

    this.purchased().sort().each(function(i) {
      if(i.get('category')) {
        categories.push({item: i.get('name'), category: i.get('category').get('name') });
      }
    },this);
  
    return _.uniq(categories,false,function(i) { return i.item });
  },
 

  getCategory: function(productName) {
    var r = _.find(this.productCategories(), function(i) {
        return i.item == productName });
    return (r) ? r.category : '';
  },


  toBuy: function() {
    return new ShoppingList(this.where({purchased:false}));
  }
});

window.ShoppingList.prototype.comparator = function(item) {
  return (9999999999999 - new Date(Date.parse(item.get('created_at'))).getTime());
}
