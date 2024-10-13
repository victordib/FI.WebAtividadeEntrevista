function addBeneficiario() {
    const row_cpf = $('.beneRowCPF');
    const ben_cpf = $('#beneCPF');

    if (row_cpf.length > 0) {
        let duplicado = false;
        row_cpf.each(function (index, item) {
            if (item.innerText == ben_cpf.val()) {
                ModalDialog('Error', 'Benificiário já inserido!');
                duplicado = true;
            }
        })

        if (!duplicado) {
            addRowTableBen();
        }
    } else {
        addRowTableBen();
    }
}

function addRowTableBen() {
    if (validaCPF($('#beneCPF').val())) {
        const row_id = 'row-' + Math.random().toString().replace('.', '');

        const table_row =
            '<tr id="' + row_id + '">' +
            '<td class="beneRowCPF"> ' + $('#beneCPF').val() + '</td>' +
            '<td>' + $('#beneNome').val() + '</td>' +
            '<td>' +
            '<a onClick="alterarRow(\'' + row_id + '\')" class="btn btn-primary">Alterar</a>' +
            '<a onClick="excluirRow(\'' + row_id + '\')" class="btn btn-primary">Excluir</a>' +
            '</td>' +
            '</tr> ';

        $('#beneTable tbody').append(table_row);
    }
    else
        ModalDialog("CPF Inválido", "Por gentileza, digite um CPF válido!");

    document.getElementById('beneNome').value = ''
    document.getElementById('beneCPF').value = ''
}

function listBeneficiarios() {
    obj.Beneficiarios.forEach(function (bene) {

        const table_row =
            '<tr id="' + bene.Id + '">' +
            '<td class="beneRowCPF"> ' + bene.CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") + '</td>' +
            '<td>' + bene.Nome + '</td>' +
            '<td>' +
            '<a onClick="alterarRow(\'' + bene.Id + '\')" class="btn btn-primary">Alterar</a>' +
            '<a onClick="excluirRow(\'' + bene.Id + '\')" class="btn btn-primary">Excluir</a>' +
            '</td>' +
            '</tr> ';

        $('#beneTable tbody').append(table_row);
    });
}

function excluirRow(id) {
    if (id.includes("row-")) {
        $('#' + id).remove();
    }
    else {
        $.ajax({
            url: urlDeleteBene,
            method: "POST",
            data: {
                "id": id
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    $('#' + id).remove();
                }
        });
    }
}

function getBeneficiarios() {
    var beneficiarios = []

    $('#beneRows tr').each(function (item, valor) {
        let beneficiario = {}

        beneficiario["CPF"] = valor.childNodes[0].innerText;
        beneficiario["Nome"] = valor.childNodes[1].innerText;

        beneficiarios.push(beneficiario);
    })

    return beneficiarios;
}