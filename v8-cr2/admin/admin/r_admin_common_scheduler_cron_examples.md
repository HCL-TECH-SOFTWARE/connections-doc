# Examples of scheduler values {#r_admin_common_scheduler_cron_examples .reference}

Use the examples provided here to construct your own Cron calendar scheduler values or copy and paste these values into your wsadmin commands to reuse them.

## Scheduler values { .section}

**\*/30 \* \* \* \* ?**

Every 30 seconds

**0 \*/5 \* \* \* ?**

Every 5 minutes starting at midnight. Be very sure to specify ‘0' for seconds

**0 0 \* \* \* ?**

Every hour

**0 0 \* ? \* \***

Every hour on the hour

**0 50 \* \* \* ?**

Every hour at 50 minutes past the hour

**0 15 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 1,2,3,4,5,6,7,8,9,10,11,12 ?**

Every hour at 15 minutes past the hour

**0 0 0-22/2 \* \***

Every other hour starting at midnight.

**0 0 4/5 \* \* ?**

Every 5 hours starting at 4 AM. This would run at 4:00, 9:00, 14:00, and 20:00.

**0 0 0,8,16 \* \* ?**

Midnight, 8 AM, and 4 PM every day

**0 0 11 \* \* ?**

Every day at 11 AM

**0 0 0 \* \* ?**

Every day at midnight

**0 0 2 ? \* \***

Every day at 2 AM

**0 0 12 ? \* MON,TUE,WED,THU,FRI**

Weekdays at noon. MON and so on represent the days of the week.

**0 0 23 ? \* 2-6**

Monday through Friday at 11 PM

**0 0 21 ? \* 2-6/2**

Monday, Wednesday, and Friday at 9 PM

**0 30 18 ? \* SAT,SUN**

Weekend days at 6:30 PM

**0 0 2 ? \* SUN**

Weekly on Sundays at 2:00 AM

**0 0 23 ? \* SAT**

Weekly on Sat at 11 PM

**0 0 \* 1 \* ?**

Every hour on the first day of every month

**0 1 0 L \* ?**

Last day of every month at 00:01 AM

**0 59 23 L \* ?**

Every month on last day at 11:59 PM

**0 0 22 1 \* ?**

First day of every month at 10 PM

**0 45 15 2 1,4,7,10 ?**

Quarterly on the 2nd day of the month \(January, April, July, October\) at 3:45 PM

**0 45 15 2 \*/3 ?**

Quarterly on the 2nd day of the month \(January, April, July, October\) at 3:45 PM

**0 45 15 2 1 ? \| 0 45 15 2 4 ? \| 0 45 15 2 7 ? \| 0 45 15 2 10 ?**

Quarterly on the 2nd day of the month \(January, April, July, October\) at 3:45 PM

**0 30 3 1 1,7 ?**

January 1 and July 1 at 3:30 AM

**0 30 3 2 1 ? \| 0 30 3 1 7 ?**

January 2 and July 1 at 3:30 AM

**0 0 0 4 7 ?**

Once a year at midnight on the 4th of July

**0 30 9 4 7 ?**
Once a year at 9:30 AM on the 4th of July

**0 45 15 2 1 ?**

Once a year on January 2 at 3:45 PM

**Parent topic:** [Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

