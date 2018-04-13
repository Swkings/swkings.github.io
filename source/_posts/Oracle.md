---
title: Oracle
tags:
  - Oracle
  - PL/SQL
categories:
  - 课程笔记
  - 数据库
comments: true
abbrlink: f145fed6
date: 2018-03-26 19:24:41
password:
---
---

创建表
===

1、自定义建表
---

```SQL
create table table_name
(
    a1  number,
    a2 varchar
)
```

2、从其他数据库中复制表(包括表结构数据)
---

```SQL
create table Table_Name
as
select * from Copy_Table;
```

3、从其他数据库中复制表(只复制表结构)
---

```SQL
create or replace table Table_Name
as
select * from copy_table
where 1=2 //不为真，所以只复制结构，不复制数据
```

视图
===

1、创建视图
---

```SQL
create or replace view dept_sum_vw(name,minsal,maxsal,avgsal)
as
select d.dname, min(e.sal), max(e.sal), avg(e.sal)
from  emp e, dept d
where e.deptno=d.deptno
group by d.dname;
```

2、查询视图
---

```SQL
select * from view_name;
```

索引
===

1、创建索引
---

```SQL
//create unique index为创建唯一索引
//create bitmap index为创建位图索引
//<Table_Name>(Column_Name1,Column_Name2...)为创建组合索引
create index <Index-Name> on <Table_Name>(Column_Name);
```

2、查看索引
---

一般利用数据字典视图USER_INDEXES、USER_IND_COLUMNS查看索引信息。

```SQL
select * from user_indexes;
```

```SQL
select * from user_ind_columns
where index_name='Index_Name';
```

3、删除索引
---

```SQL
drop index Index_Name;
```

同义词
===

1、创建同义词
---

```SQL
//也可以为同义词、视图创建同义词，将Table_Name改为相应的名字就好。
create synonym Sy_Name for Table_Name;
```

2、查看同义词
---

利用数据字典视图user_synonyms、all_synonyms查看同义词信息。

```SQL
select * from user_synonyms;
```

```SQL
select * from all_synonyms;
```

3、删除同义词
---

```SQL
drop synonym Sy_Name;
```

序列
===

1、创建序列
---

一般有步长、最大值、最小值时一般不采用cachce

```SQL
create sequence Se_Name
increment by value //步长
start with value // 开始值
maxvalue value //最大值
minvalue  value //最小值
cycle value //循环
nocycle //不循环,默认
cache //缓存
nocache //不缓存，两者都不写默认缓存20个序列号
nextvalue //下一个
currval //当前值
```

2、查看序列
---

利用数据字典视图user_sequences、all_sequences查看序列信息。

```SQL
select * from user_sequences;
```

```SQL
select * from all_sequences;
```

3、引用序列
---

向表中插入序列

```SQL
insert into Table_Name
values(Se_Name.nextval,Column_Name);
```

4、修改序列
---

```SQL
alter sequence Se_Name
increment by new_value
start with new_value
maxvalue new_value
···

```

游标
===

Oracle数据库的Cursor类型包含三种：

 1.静态游标
 ---   A、显式（explicit）游标
 ---   B、隐式（implicit）游标
 2.REF游标，一种引用类型，类似于指针。

```SQL
//隐式游标的用法
begin
    for em in (select empno,ename from emp where deptno=10)
    loop
        dbms_output.put_line('id'=||em.empno||',name+'||em.ename);
    end loop
end;
```

```SQL
//显式游标分为四个步骤：定义游标、打开游标、提取游标和关闭游标。
declare
    cursor mycur(vdept number default 20)//定义游标
        is
        select empno,ename from emp where deptno = vdept;
    vno emp.empno%type;
    vname emp.ename%type;
begin
    if not mycur%isopen then
        open mycur(10);  //打开游标
    end if;
    fetch mycur into vno,vname;  //提取游标数据，每次只能取到一条
    while mycur%found loop
        dbms_output.put_line(mycur%rowcount||':'||vno||vname);
        fetch mycur into vno,vname;  //提取游标数据
    end loop;
    close mycur; //关闭游标
end;
```

```SQL
//游标for循环，自动打开游标，移动数据，关闭游标
declare
    cursor mycur(vdept number default 20)
        is
        select empno,ename from emp where deptno = vdept;
    vno emp.empno%type;
    vname emp.ename%type;
begin
    for e in mycur(10) loop
        dbms_output.put_line(mycur%rowcount||':'||e.empno||','||e.ename);
    end loop;
end;

```

异常
===

在PL/SQL块中有三种类型的异常：预定义异常（oracle自带）、非预定义异常、用户自定义异常

1、非预定义的异常
---

```SQL
create or replace
procedure obj6_1(name EMP.ENAME%type)
as
  vsal EMP.SAL%type;
  vjob EMP.JOB%type;
begin
  select SAL,JOB
  into vsal,vjob
  from EMP
  where ENAME = name;
  dbms_output.put_line('sal:'||vsal||',job:'||vjob);
  exception
  when no_data_found then
  dbms_output.put_line('该员工不存在！');
end;
```

```SQL
create or replace
procedure obj6_12(year charge.shyear%type)
as
    sno_sum number:=0;
    money_sum CHARGE.TUITION%type:=0;
Cursor cur is select TUITION,BALANCE  from CHARGE where year=shyear;
begin
  for result_row in cur LOOP
    if result_row.TUITION>result_row.BALANCE
    then sno_sum:=sno_sum+1;money_sum:=money_sum+result_row.TUITION-result_row.BALANCE;
    end if;
  end LOOP;
  dbms_output.put_line('sno_sum:'||sno_sum||',money_sum:'||money_sum);
  exception
    when value_error then
      dbms_output.put_line('数据类型错误');
    when too_many_rows then
      dbms_output.put_line('返回多行数据');
end;
```

```SQL
create or replace
procedure obj6_13
as
    i int;
    j int;
begin
  for i in 1..9 loop
  for j in 1..i loop
  dbms_output.put(i||'*'||j||'='||(i*j)||' ');
  end loop;
  dbms_output.put_line(' ');
  end loop;
  exception
    when value_error then
      dbms_output.put_line('数据类型错误！');
    when too_many_rows then
      dbms_output.put_line('返回多行匹配的数据！');
end;
```

2、用户自定义异常
---

```SQL
declare
    salary_err EXCEPTION;
    vsal emp.sal%type;
begin
    select sal into vsal from emp where empno = 7369;
    if vsal <= 800 then
        raise salary_err;
    end if;
    exception
        when salary_err then
            dbms_output.put_line('salary to low!');
end;
```

储存程序
===

储存程序的形式有：储存过程、储存函数、触发器和程序包等。

1、储存过程
---

```SQL
//无参数
create or replace procedure obj_name
as
  vsal EMP.SAL%type;
  vjob EMP.JOB%type;
begin
  select SAL,JOB
  into vsal,vjob
  from EMP
  where ENAME = 'SMITH';
  dbms_output.put_line('sal:'||vsal||',job:'||vjob);
end;
```

```SQLSQL
//有参数
create or replace procedure obj_name(dno in DEPT.DEPTNO%type)
as
  vname DEPT.DNAME%type;
  vloc DEPT.LOC%type;
begin
  select DNAME,LOC
 into vname,vloc
  from DEPT
  where DEPTNO = dno;
  dbms_output.put_line('name:'||vname||',loc:'||vloc);
end;
```

```SQL
//执行过程
exec obj_name; // execute obj_name;
exec obj_name(1000); //execute obj_name(1000);
```

```SQL
//删除过程
drop procedure obj_name;
```

2、储存函数
---

```SQL
create or replace function obj4_5(eno in EMP.EMPNO%type)
return EMP.SAL%type
as
  vsal  EMP.SAL%type;
begin
  select sal  into vsal
  from EMP
  where EMPNO = eno;
  return vsal;
end;
```

```SQL
//执行方法一
select obj4_5(7369) from dual;
```

```SQL
//执行方法二
begin
  dbms_output.put_line(obj4_5(7369));
end;
```

```SQL
//删除函数
drop function obj_name;
```

3、程序包
---

--程序包相当于面对对象语言中的类。
--程序包有"包说明"和"包主体"组成。包说明用来定义数据类型、变量、过程、函数、异常和游标等元素，相当于程序包的接口。
--包主体实现说明中的代码。
--先编译包说明、再编译包主体，不能同时编译。

```SQL
//包说明
create or replace package obj7_8 as | is
    Procedure getMassage(vempno emp.empno%type);
    Procedure getMassage(vname emp.ename%type);
    Procedure getOne;
end;
```

```SQL
//包主体
create or replace package body obj7_8 as
Procedure getMassage(vempno emp.empno%type)
as | is
  row_emp emp%rowtype;
begin
    select * into row_emp
    from emp
    where empno= vempno;
dbms_output.put_line('编号为'|| vempno || '的员工的所有信息：' || row_emp.ename || ',' ||row_emp.job || ',' || row_emp.mgr || ',' ||row_emp.hiredate || ',' ||row_emp.sal || ','||'0' || ',' || row_emp.deptno);
end;

Procedure getMassage(vname emp.ename%type)
as
    row_emp emp%rowtype;
begin
    select *into row_emp
    from emp
    where ename= vname;
    dbms_output.put_line('编号为'|| row_emp.empno || '的员工的所有信息：' || row_emp.ename || ',' ||row_emp.job || ',' || row_emp.mgr || ',' ||row_emp.hiredate || ',' ||row_emp.sal || ','||'0' || ',' || row_emp.deptno);
end;

Procedure getOne as
  begin
    begin
        getMassage(7902);
    end;
    begin
        getMassage(7934);
    end;
    begin
        getMassage('SMITH');
    end;
    begin
        getMassage('FORD');
    end;
  end;
end;
```

```SQL
//调用包
begin
  obj7_8.getMassage(7902);
  obj7_8.getMassage('SMITH');
  obj7_8.getOne;
end;
```

```SQL
//更新了包说明或程序包后，也应该重新编译包说明与包主体。防止出错。
alter package package_name compile [package | body | specification];
```

```SQL
//删除包
drop package [body] packge_name;
```

4、触发器
---

-- 分为DML触发器、instead of触发器、系统触发器（DDL事件、模式、数据库）
-- 触发器不接受参数
-- 一个表最多12个触发器
-- 在触发器的执行部分只能用DML语句（select、insert、update、delete），不能用DDL语句（create、alter、drop）。

```SQL
----------------------------DML触发器-----------------------

create or replace trigger obj8_1
before insert  or update [of colum1,colum2]
on emp1
for each row
declare
    v_max emp1.sal%type;
    PRAGMA AUTONOMOUS_TRANSACTION;
begin
  select sal  into v_max from emp1 where empno=:new.mgr;
  if :new.sal>v_max  then
    raise_application_error(-20000,'部门员工工资不能高于经理');
  end if;
end;
```

```SQL
create or replace trigger obj8_3
after delete
on dept1
for each row
begin
  delete from emp1 where deptno =:old.deptno;
end;
```

```SQL
create or replace trigger obj8_6
before insert or update
on emp4
for each row
begin
case
 when updating('ename') THEN
   :new.ename:= upper(:new.ename);
 when inserting then
   :new.ename:= upper(:new.ename);
 end case;
 end;
```

```SQL
//删除触发器
drop trigger trigger_name;
```

```SQL
//使触发器失效、暂时不起作用
alter trigger trigger_name disable;
//使触发器再次有效
alter trigger trigger_name enable;
```

```SQL
//条件谓语
-- inserting 当触发事件是insert时，取值为true，否则为false。
-- updating('column') 当触发事件是update时，如果修改了某列，则为true，否则为false。
-- deleting 当触发事件是delete时，则取值为true，否则为false。
```

```SQL
//触发条件
-- 由when子句指定一个逻辑表达式，只允许在行级触发器上指定触发条件（for each row）
```

```SQL
----------------------instead of触发器-------------------
-- 只能被创建在视图上，并且该视图没有指定with check option
-- 不能指定before或after选项
-- for each row 可不指定，因为instead of触发器必定是行级触发器

create or replace trigger view_name
......
```

PL/SQL
===

-- 在 PL/SQL 块中可以包含select语句、DML语句、DCL语句，但不能直接包含DDL语句。
-- 可以使用 into 子句把查询结果放在变量中。使用 set serveroutput on 命令设置环境变量 serveroutput 为打开状态。
-- declare 关键字标志这 PL/SQL 程序声明段的开始，在声明段中可以声明变量、常量和游标等对象。
-- begin 关键字标志着主程序的开始， end 关键字标志着主程序体的结束。
-- 使用函数 dbms_output.put_line() 可以输出参数的值

---

输出九九乘法表
---

```SQL
create procedure P_name
as
    i int;
    j int;
begin
    for i in 1..9 loop
        for j in 1..i loop
            dbms_output.put(i||'*'||j||'='||(i*j)||' ');
        end loop;
        dbms_output.put_line(' ');
    end loop;
end;
```

闰年
---

在A_DB模式中有一个名为tan3(a)的表，表中有若干个整数（不要管是否有重复）,假设这些数表示年份。 请编写一个名为myfun25()的存储函数（无参数），统计该表中有多少个年份是闰年，并作为函数返回值返回。 说明：闰年的计算方法：被400整除，或被4整除而不能被100整除的年份为闰年。

```SQL
create or replace function myfun25
    return integer
as
    total integer:=0;
begin
    for y in(select * from a_db.tan3) loop
            if mod(y.a,400)=0 or(mod(y.a,4)=0 and mod(y.a,100)=0)
            then total:=total+1;
            dbms_output.put_line(y.a);
            end if ;
    end loop;
    return total;
end ;
```

水仙花数
---

在A_DB模式中有一个名为tanbn1(a,b)的表，表中有若干个整数（不要管是否有重复）。 请编写一个名为F25()的存储函数（无参数），统计该表中有多少个数是水仙花数，并作为函数返回值返回。
说明：如果一个三位数等于其各位数字的立方之和，则该数称为水仙花数。如153=1*1*1+5*5*5+3*3*3。

```SQL
create or replace function F25
    return integer
as
    m integer:=0;
begin
    for e in(select * FROM a_db.tanbn1)loop
        if e.a>=100 and e.a<1000 then
            if e.a= trunc(e.a/100)**3+mod(trunc(e.a/10),10)**3+mod(e.a,10)**3
            then m:=m+1;
            end if;
        end if ;
        if e.b>=100 and e.b<1000 then
            if e.b= trunc(e.b/100)**3+mod(trunc(e.b/10),10)**3+mod(e.b,10)**3
            then m:=m+1;
            end if;
        end if ;
    end loop ;
    return m;
end;
```

1+2+?+n
---

请编写一个名为F24()的存储函数（无参数），计算 1+2+?+n 的和。 说明：n的值存放在A_DB模式中的“输入参数表”中。

```SQL
create or replace function F24
    return integer
as
        n integer;
        total integer:=0;
begin
    select 参数值 into n
    from a_db.输入参数表 where 题目='1+2+?+n';
    for e in 1..n loop
        total:=total+e;
    end loop;
    return total;
end;
```

二进制转换为十进制
---

```SQL
reate or replace function obj7_9(v_char VARCHAR)
return number
as
 v_rtn number(10):=0;
 rownum number(10);
 begin
   rownum :=1;
   while rownum<=length(v_char) loop
     v_rtn:= v_rtn+substr(v_char, rownum,1)*power(2,length(v_char)- rownum);
     rownum:= rownum+1;
   end LOOP ;
   return v_rtn;
 end;
```

连续整数之和一
---

编写一个名为obj7_6的存储函数，判断正整数n是否是若干个连续的正整数之和。如是，则返回1，否则返回0。n是函数的参数

```SQL
create or replace function obj7_6(n number)
return number
as
    i integer ;
    b number;
    e number:=0;
begin
 for i in 2..n loop
       b:=(2*n+i-i*i)/(2*i);
       if b=trunc(b)and b>0 then
          begin
            e:= 1;
          end ;
       end if;
  end loop;
  return e;
 end;
```

连续整数之和二
---

编写一个名为obj7_5的存储过程，判断正整数n是否是若干个连续的正整数之和。如是，则输出这些连续的正整数；如果有多串连续的正整数，则输出最长的那串连续的正整数。n是过程的参数。如：15=1+2+3+4+5，15=7+8，则输出1,2,3,4,5。

```SQL
create or replace procedure obj7_5(n number)
as
    i integer;
    b number;
    j integer;
    d integer;
    e number;
    flag number:=0;
begin
 for i in reverse 2..n loop
       b:=(2*n+i-i*i)/(2*i);
       if b=trunc(b)and b>0 then
           begin
            flag:=2;
            dbms_output.put(b||' ');
            e:= i;
           end;
           for j in 1..e-1 loop
                 begin
                 d:= trunc(b+j);
                 dbms_output.put(d||' ');
                 end;
           end loop;
       dbms_output.put_line(' ');
       end if;
       if flag = 1 then exit;
       end if;
   end loop;
end;
```