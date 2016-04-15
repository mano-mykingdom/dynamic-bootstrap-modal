# Dynamic Bootstrap Modal
Create bootstrap modal window from JavaScript

```
var myModal = new Modal({
    header: '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="gridSystemModalLabel">Modal title</h4>',
    body: 'I\'m a modal',
    footer: 'footer text here',
    autoDestroy: true
});
myModal.show();
```
