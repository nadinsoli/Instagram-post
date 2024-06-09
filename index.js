$(document).ready(function() {
    let liked = false;

    $('#postForm').submit(function(event) {
        event.preventDefault();

        // Inputs
        const imageInput = $('#formFile')[0].files[0];
        const descriptionInput = $('#description').val();
        const previewImage = $('#previewImage');
        const previewDescription = $('#previewDescription');
        const preview = $('#preview');
        const errorMessage = $('#error-message');

        // Validation
        const validDescription = /^[a-zA-Z0-9,. ]*$/.test(descriptionInput);

        if (!validDescription) {
            errorMessage.css('display', 'block');
            return;
        } else {
            errorMessage.css('display', 'none');
        }

        preview.css('display', 'block');
        $('#postForm').css('display', 'none');

        // Image loading
        if (imageInput) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const blob = new Blob([e.target.result], { type: imageInput.type });
                const url = URL.createObjectURL(blob);
                previewImage.attr('src', url);
            };
            reader.readAsArrayBuffer(imageInput);
        }

        previewDescription.text(descriptionInput);
    });

    // Likes 
    $('#likeButton').click(function() {
        const likeButton = $(this);
        const likeCount = $('#likeCount');
        let likes = parseInt(likeCount.text(), 10);

        if (!liked) {
            likes++;
            likeButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3.278C5.239-1.03-7.534 4.272 8 15 23.534 4.272 10.761-1.03 8 3.278z"/></svg>');
        } else {
            likes--;
            likeButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/></svg>');
        }
        likeCount.text(likes);
        liked = !liked;
    });
});
