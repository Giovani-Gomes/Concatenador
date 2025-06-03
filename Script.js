
        document.getElementById('textForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const fileInput = document.getElementById('fileInput');
            const docName = document.getElementById('docName').value.trim();
            const word = document.getElementById('word').value;

            if (!fileInput.files.length || !docName || !word) {
                alert("Preencha todos os campos e selecione um arquivo.");
                return;
            }

            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const lines = e.target.result.split(/\r?\n/); // separa as linhas
                const modifiedLines = lines.map(line => line.trim() ? word + line : ''); // adiciona dado no INÍCIO

                const newContent = modifiedLines.join('\n');

                const blob = new Blob([newContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = url;
                downloadLink.download = docName + '.txt';
                document.getElementById('downloadSection').classList.remove('d-none');
            };

            reader.readAsText(file);
        });
