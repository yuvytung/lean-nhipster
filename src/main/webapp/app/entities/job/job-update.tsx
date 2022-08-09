import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './job.reducer';
import { IJob } from 'app/shared/model/job.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJobUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JobUpdate = (props: IJobUpdateProps) => {
  const [idstask, setIdstask] = useState([]);
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { jobEntity, tasks, employees, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/job' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTasks();
    props.getEmployees();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...jobEntity,
        ...values,
        tasks: mapIdList(values.tasks),
        employee: employees.find(it => it.id.toString() === values.employeeId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="nhipsterApp.job.home.createOrEditLabel" data-cy="JobCreateUpdateHeading">
            <Translate contentKey="nhipsterApp.job.home.createOrEditLabel">Create or edit a Job</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : jobEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="job-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="job-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="jobTitleLabel" for="job-jobTitle">
                  <Translate contentKey="nhipsterApp.job.jobTitle">Job Title</Translate>
                </Label>
                <AvField id="job-jobTitle" data-cy="jobTitle" type="text" name="jobTitle" />
              </AvGroup>
              <AvGroup>
                <Label id="minSalaryLabel" for="job-minSalary">
                  <Translate contentKey="nhipsterApp.job.minSalary">Min Salary</Translate>
                </Label>
                <AvField id="job-minSalary" data-cy="minSalary" type="string" className="form-control" name="minSalary" />
              </AvGroup>
              <AvGroup>
                <Label id="maxSalaryLabel" for="job-maxSalary">
                  <Translate contentKey="nhipsterApp.job.maxSalary">Max Salary</Translate>
                </Label>
                <AvField id="job-maxSalary" data-cy="maxSalary" type="string" className="form-control" name="maxSalary" />
              </AvGroup>
              <AvGroup>
                <Label for="job-task">
                  <Translate contentKey="nhipsterApp.job.task">Task</Translate>
                </Label>
                <AvInput
                  id="job-task"
                  data-cy="task"
                  type="select"
                  multiple
                  className="form-control"
                  name="tasks"
                  value={!isNew && jobEntity.tasks && jobEntity.tasks.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {tasks
                    ? tasks.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="job-employee">
                  <Translate contentKey="nhipsterApp.job.employee">Employee</Translate>
                </Label>
                <AvInput id="job-employee" data-cy="employee" type="select" className="form-control" name="employeeId">
                  <option value="" key="0" />
                  {employees
                    ? employees.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/job" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  tasks: storeState.task.entities,
  employees: storeState.employee.entities,
  jobEntity: storeState.job.entity,
  loading: storeState.job.loading,
  updating: storeState.job.updating,
  updateSuccess: storeState.job.updateSuccess,
});

const mapDispatchToProps = {
  getTasks,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobUpdate);
