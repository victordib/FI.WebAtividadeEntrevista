﻿CREATE PROCEDURE [dbo].[FI_SP_ConsBeneficiario]
	@IdCliente int

AS
BEGIN
	SELECT ID, CPF, NOME, IDCLIENTE FROM [dbo].BENEFICIARIOS WHERE IDCLIENTE = @IdCliente
END