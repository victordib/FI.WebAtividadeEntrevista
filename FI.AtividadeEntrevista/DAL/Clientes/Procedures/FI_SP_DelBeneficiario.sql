﻿CREATE PROCEDURE [dbo].FI_SP_DelBeneficiario
	@Id bigint
AS
BEGIN
	DELETE FROM BENEFICIARIOS WHERE ID = @Id
END