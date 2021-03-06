/**
 * This function is used to generate a job list for use in displaying
 * all the jobs.
 *
 * @param connection the jdbc connection
 */
function createJobListJson(connection) {
  const startTime = System.currentTimeMillis();
  print('createJobListJson() - started');

  const stmt = connection.createStatement();
  const rs = stmt.executeQuery(sqls['get-jobs-tree.sql']);
  const data = [];

  while (rs.next()) {
    const base = rs.getInt('_BaseClass');
    const slug = rs.getString('_EnglishName');

    if (!data[base]) {
      data[base] = [];
    }

    data[base].push({
      name: rs.getString('JobName'),
      icon: rs.getInt('_JobIcon'),
      slug: slug,
      awakened: rs.getInt('_Awakened'),
    });
  }

  stmt.close();

  writeJson(config.output.jobs, 'jobs', data);

  const durationTime = System.currentTimeMillis() - startTime;
  print("createJobListJson() - completed in ${durationTime} ms");
  print();
}
