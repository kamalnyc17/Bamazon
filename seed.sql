SELECT D.department_id AS "Dept ID", D.department_name AS "Department", D.over_head_costs AS "Over Head Costs"
, SUM(P.product_sales) AS "Product Sales",  SUM(P.product_sales) - D.over_head_costs AS "total_profit"
FROM departments D INNER JOIN products P ON 
D.department_name = P.department_name GROUP BY D.department_id;