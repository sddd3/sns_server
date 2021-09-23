import mysql from 'mysql2/promise';

export type IMysqlResult = mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket | mysql.OkPacket[] | mysql.ResultSetHeader;