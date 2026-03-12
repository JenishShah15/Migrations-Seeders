import {DataSource} from 'typeorm';

export class AccountTypesSeeder{
    private getFinancialStatement(category: string): string {

  if (category === "ASSETS" || category === "LIABILITIES") {
    return "balancesheet";
  }

  if (category === "INCOME_DIRECT" || category === "EXPENSE_DIRECT") {
    return "trading";
  }

  return "p_and_l";
}

    public async run(datasource:DataSource):Promise<void>{

        
        const accountTypes = [
  { name: "Capital Account", code: "LIA_CAP", category: "LIABILITIES" },
  { name: "Reserves & Surplus", code: "LIA_RES", category: "LIABILITIES" },
  { name: "Secured Loans", code: "LIA_LOAN_SEC", category: "LIABILITIES" },
  { name: "Unsecured Loans", code: "LIA_LOAN", category: "LIABILITIES" },
  { name: "Current Liabilities", code: "LIA_SC", category: "LIABILITIES" },
  { name: "Duties & Taxes", code: "LIA_GST_PAY", category: "LIABILITIES" },
  { name: "Provisions", code: "LIA_PROV", category: "LIABILITIES" },
  { name: "Current Liabilities", code: "LIA_AP", category: "LIABILITIES" },
  { name: "Duties & Taxes", code: "LIA_TDS_PAY", category: "LIABILITIES" },

  { name: "Fixed Assets", code: "AST_FIXED", category: "ASSETS" },
  { name: "Investments", code: "AST_INV_LTD", category: "ASSETS" },
  { name: "Loans & Advances", code: "AST_ADV", category: "ASSETS" },
  { name: "Current Assets", code: "AST_AR", category: "ASSETS" },
  { name: "Stock-in-Hand", code: "AST_INV", category: "ASSETS" },
  { name: "Bank Accounts", code: "AST_BANK", category: "ASSETS" },
  { name: "Cash-in-Hand", code: "AST_CASH", category: "ASSETS" },
  { name: "Stock-in-Hand", code: "AST_SIT", category: "ASSETS" },

  { name: "Trading Income", code: "TRD_INC_SALES", category: "INCOME_DIRECT" },
  { name: "Trading Income", code: "TRD_INC_SERVICE", category: "INCOME_DIRECT" },
  { name: "Trading Income", code: "TRD_INC_DIR", category: "INCOME_DIRECT" },
  { name: "Closing Stock", code: "TRD_INC_CLSTK", category: "INCOME_DIRECT" },

  { name: "Opening Stock", code: "TRD_EXP_OPSTK", category: "EXPENSE_DIRECT" },
  { name: "Trading Expense", code: "TRD_EXP_PUR", category: "EXPENSE_DIRECT" },
  { name: "Trading Expense", code: "TRD_EXP_MFG", category: "EXPENSE_DIRECT" },
  { name: "Trading Expense", code: "TRD_EXP_DIR", category: "EXPENSE_DIRECT" },

  { name: "Profit & Loss Income", code: "PNL_INC_IND", category: "INCOME_INDIRECT" },
  { name: "Profit & Loss Income", code: "PNL_INC_MISC", category: "INCOME_INDIRECT" },

  { name: "Profit & Loss Expense", code: "PNL_EXP_RR", category: "EXPENSE_INDIRECT" },
  { name: "Profit & Loss Expense", code: "PNL_EXP_ADM", category: "EXPENSE_INDIRECT" },
  { name: "Profit & Loss Expense", code: "PNL_EXP_SALDIST", category: "EXPENSE_INDIRECT" },
  { name: "Profit & Loss Expense", code: "PNL_EXP_UTEL", category: "EXPENSE_INDIRECT" },
  { name: "Profit & Loss Expense", code: "PNL_EXP_MISC", category: "EXPENSE_INDIRECT" },
  { name: "Profit & Loss Expense", code: "PNL_EXP_SALWGS", category: "EXPENSE_INDIRECT" },
  { name: "Profit & Loss Expense", code: "PNL_EXP_IND", category: "EXPENSE_INDIRECT" },
];

    await datasource
  .createQueryBuilder()
  .insert()
  .into("account_types", [
    "name",
    "code",
    "category",
    "financial_statement_types",
    "default_data",
    "organization_public_id"
  ])
  .values(
    accountTypes.map(acc => ({
      name: acc.name,
      code: acc.code,
      category: acc.category,
      financial_statement_types: this.getFinancialStatement(acc.category),
      default_data: true,
      organization_public_id: null
    }))
  )
  .orIgnore()
  .execute();


    }
}