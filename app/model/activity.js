module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const url = app.model.define('activities', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    mainImg: {
      field: 'main_img',
      type: STRING(100),
    },
    name: {
      field: 'name',
      type: STRING(100),
    },
    count: {
      field: 'count',
      type: INTEGER(5),
    },
    totalCount: {
      field: 'total_count',
      type: INTEGER(5),
    },
    startDate: {
      field: 'start_date',
      type: DATE,
    },
    endDate: {
      field: 'end_date',
      type: DATE,
    },
    detailImg: {
      field: 'detail_Img',
      type: STRING(100),
    },
    address: {
      field: 'address',
      type: STRING(100),
    },
    meetingPlace: {
      field: 'meeting_place',
      type: STRING(100),
    },
    description: {
      field: 'description',
      type: STRING(255),
    },
    isGather: {
      field: 'is_gather',
      type: INTEGER(1),
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  return url;
};
