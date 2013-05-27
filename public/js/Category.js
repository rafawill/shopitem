window.Category = Backbone.Model.extend({
idAttibute:"_id",
url:function(){
	//return _.isUndefined(this.get('_id')) ? '/categories'  : '/category/' + this.get('_id');
	return (this.get('_id')) ? '/category/' + this.get('_id'): '/categories';

},
defaults:function(){
	return {
	name:"untitle"
    }
}
});

window.CategoryCollection = Backbone.Collection.extend({
	model:Category,
	url:'/categories'
});
