import { EntityError } from '../helpers/errors/domain_errors'
import { STATE } from '../enums/state_enum'

export interface WithdrawProps {
  notebookSerialNumber: string
  studentRA?: string 
  name?: string 
  initTime?: number
  finishTime?: number
  state: STATE
}

export interface JsonWithdrawProps {
  notebookSerialNumber: string
  studentRA: string
  name?: string
  initTime: number
  finishTime?: number
  state: string
  message: string
}

export class Withdraw {
  constructor(public props: WithdrawProps) {
    this.validateProps(props)
  }

  private validateProps(props: WithdrawProps) {
    if (!Withdraw.validateNotebookSerialNumber(props.notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    if (props.initTime !== undefined && !Withdraw.validateTime(props.initTime)) {
      throw new EntityError('initTime')
    }

    if (
      props.finishTime !== undefined &&
      !Withdraw.validateTime(props.finishTime)
    ) {
      throw new EntityError('finishTime')
    }

    if (
      props.finishTime !== undefined &&
      props.initTime !== undefined &&
      props.finishTime < props.initTime
    ) {
      throw new EntityError(
        'initTime and finishTime must be in the correct order',
      )
    }
  }

  get notebookSerialNumber() {
    return this.props.notebookSerialNumber
  }

  setnotebookSerialNumber(notebookSerialNumber: string) {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }
    this.props.notebookSerialNumber = notebookSerialNumber
  }

  get studentRA() {
    return this.props.studentRA
  }

  setStudentRA(studentRA?: string) {
    if (studentRA !== undefined && !Withdraw.validateStudentRA(studentRA)) {
      throw new EntityError('studentRA')
    }
    this.props.studentRA = studentRA
  }

  get name() {
    return this.props.name
  }

  setName(name?: string) {
    this.props.name = name
  }

  get initTime() {
    return this.props.initTime
  }

  setInitTime(initTime?: number) {
    if (initTime !== undefined && !Withdraw.validateTime(initTime)) {
      throw new EntityError('initTime')
    }
    this.props.initTime = initTime
  }

  get finishTime() {
    return this.props.finishTime
  }

  setFinishTime(finishTime?: number) {
    if (finishTime !== undefined && !Withdraw.validateTime(finishTime)) {
      throw new EntityError('finishTime')
    }
    this.props.finishTime = finishTime
  }

  get state() {
    return this.props.state ?? STATE.PENDING
  }

  setState(state: STATE) {
    if (!Withdraw.validateState(state)) {
      throw new EntityError('state')
    }
    this.props.state = state
  }

  static validateNotebookSerialNumber(notebookSerialNumber?: string): boolean {
    return (
      typeof notebookSerialNumber === 'string' &&
      notebookSerialNumber.length > 0 &&
      notebookSerialNumber.length !== 0 &&
      notebookSerialNumber.length <= 50
    )
  }

  static validateStudentRA(studentRA?: string): boolean {
    if (studentRA === undefined) {
      return true
    }
    const raPattern = /^\d{2}\.\d{5}-[0-9]$/
    return raPattern.test(studentRA)
  }

  static validateTime(time?: number): boolean {
    if (
      typeof time !== 'number' ||
      isNaN(time)
    ) {
      return false
    }

    const minValidTime = new Date('1970-01-01').getTime()
    const maxValidTime = new Date('2100-01-01').getTime()

    return time >= minValidTime && time <= maxValidTime
  }

  static validateState(state: STATE): boolean {
    return Object.values(STATE).includes(state)
  }
}