

class CommentBox {
    constructor() {
        this.commentInput = document.getElementById('commentInput');
        this.addCommentBtn = document.getElementById('addCommentBtn');
        this.commentList = document.getElementById('commentList');

        this.addCommentP = this.addComment.bind(this);

        this.addCommentBtn.addEventListener('click', this.addCommentP);
    }

    addComment() {
        const commentText = this.commentInput.value;

        if ( commentText !== '') {
            const newComment = this.createCommentElement(commentText);
            this.commentList.appendChild(newComment);
            this.commentInput.value = '';

        }
    }

    createCommentElement(text) {
         const li = document.createElement('li');
         const commentDiv = document.createElement('div');
         commentDiv.textContent = text;
         li.appendChild(commentDiv);
         
         const replyBtn = document.createElement('button');
         replyBtn.textContent = 'Reply';
         replyBtn.addEventListener('click', this.showReplyInput.bind(this));

         li.appendChild(replyBtn);

         return li;
    }

    showReplyInput(event) {
        const replyBtn = event.target;
        console.log(replyBtn);
        
        const li = replyBtn.parentElement;

        const replyContainer = document.createElement('div');
        replyContainer.classList.add('reply-container');
        li.appendChild(replyContainer);


        // const replyContainer = li.querySelector('.reply-container');
        const replyInput = document.createElement('input');
        replyInput.type = 'text';
        replyInput.placeholder = 'Reply of your comment here...';
        
        const replyAddBtn = document.createElement('button');
        replyAddBtn.textContent = 'Add Reply';

        replyContainer.appendChild(replyInput);
        replyContainer.appendChild(replyAddBtn);


    }
}

new CommentBox();